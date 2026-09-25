$port = 5510
$baseDir = "C:\Users\patel\.gemini\antigravity\scratch\mype-agro-covers"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()

Write-Host "================================================="
Write-Host " VARUDI ENTERPRISE Web Server Running!"
Write-Host " Local URL: http://localhost:$port/"
Write-Host "================================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".json" = "application/json"
    ".webp" = "image/webp"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $req = $context.Request
            $res = $context.Response

            $rawPath = $req.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($rawPath) -or $rawPath -eq "") {
                $rawPath = "index.html"
            }

            $cleanRelPath = $rawPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            $fullPath = Join-Path $baseDir $cleanRelPath

            if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
                $cType = "application/octet-stream"
                if ($mimeTypes.ContainsKey($ext)) {
                    $cType = $mimeTypes[$ext]
                }
                $res.ContentType = $cType

                $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                $res.ContentLength64 = $bytes.Length
                $res.StatusCode = 200
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $res.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
                $res.ContentLength64 = $msg.Length
                $res.OutputStream.Write($msg, 0, $msg.Length)
            }
            $res.OutputStream.Close()
            $res.Close()
        } catch {
            # Ignore individual client errors and keep listening
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
