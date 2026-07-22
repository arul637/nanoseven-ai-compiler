from flask import Response
from language_manager import language_manager


class DownloadManager:
    def create_download(self, language, code):
        extension = language_manager.get_extension(language)
        filename = self._get_filename(language, extension)
        return Response(
            code,
            mimetype="text/plain",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"',
                "Content-Type": "text/plain; charset=utf-8",
            }
        )

    def _get_filename(self, language, extension):
        naming = {
            "python": "main",
            "c": "main",
            "cpp": "main",
            "java": "Main",
            "javascript": "main",
            "typescript": "main",
            "go": "main",
            "rust": "main",
            "php": "index",
            "ruby": "main",
            "kotlin": "Main",
            "swift": "main",
            "cs": "Program",
            "bash": "script",
            "sql": "query",
            "html": "index",
            "css": "style",
        }
        name = naming.get(language, "code")
        return f"{name}{extension}"


download_manager = DownloadManager()
