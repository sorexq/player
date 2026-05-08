package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"runtime/debug"
)

// recoveryMiddleware catches panics and returns 500 with stack trace logging
func recoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("PANIC: %v\nStack:\n%s", err, debug.Stack())
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func main() {
	staticDir := "../frontend/build"
	port := ":8080"

	// Startup check: static directory must exist
	if _, err := os.Stat(staticDir); os.IsNotExist(err) {
		log.Fatalf("ERROR: Static directory '%s' not found. Run 'npm run build' in frontend first.", staticDir)
	}
	log.Printf("Serving static files from: %s", staticDir)

	// Request handler with SPA fallback
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestedPath := filepath.Join(staticDir, r.URL.Path)
		info, err := os.Stat(requestedPath)

		// Serve existing files directly
		if err == nil && !info.IsDir() {
			log.Printf("200 %s %s (file)", r.Method, r.URL.Path)
			http.ServeFile(w, r, requestedPath)
			return
		}

		// Fallback to index.html for SPA routing
		indexPath := filepath.Join(staticDir, "index.html")
		if _, err := os.Stat(indexPath); os.IsNotExist(err) {
			log.Printf("404 %s %s (index.html missing)", r.Method, r.URL.Path)
			http.NotFound(w, r)
			return
		}
		log.Printf("200 %s %s (SPA fallback)", r.Method, r.URL.Path)
		http.ServeFile(w, r, indexPath)
	})

	// Apply middleware
	http.Handle("/", recoveryMiddleware(handler))

	log.Printf("Server running at http://localhost%s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
