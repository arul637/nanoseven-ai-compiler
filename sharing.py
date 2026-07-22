import uuid
import base64
import json
from logger import logger


class SharingManager:
    def __init__(self):
        self._store = {}

    def create_share(self, language, code):
        try:
            payload = {
                "language": language,
                "code": code,
            }
            payload_json = json.dumps(payload)
            encoded = base64.urlsafe_b64encode(payload_json.encode()).decode()
            share_id = uuid.uuid4().hex[:12]
            self._store[share_id] = encoded
            logger.info(f"Share created: {share_id}")
            return {"success": True, "id": share_id, "url": f"/api/share/{share_id}"}
        except Exception as e:
            logger.error(f"Share creation failed: {str(e)}")
            return {"success": False, "error": "Failed to create share link"}

    def get_share(self, share_id):
        try:
            encoded = self._store.get(share_id)
            if not encoded:
                return {"success": False, "error": "Share not found"}
            payload_json = base64.urlsafe_b64decode(encoded.encode()).decode()
            payload = json.loads(payload_json)
            return {"success": True, "language": payload.get("language", ""), "code": payload.get("code", "")}
        except Exception as e:
            logger.error(f"Share retrieval failed: {str(e)}")
            return {"success": False, "error": "Failed to retrieve share"}


sharing_manager = SharingManager()
