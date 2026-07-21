from pydantic import BaseModel, Field
from typing import Optional, Any


class RunResponse(BaseModel):
    success: bool = True
    language: str = ""
    stdout: str = ""
    stderr: str = ""
    variables: dict = {}
    execution_steps: list = []
    error_type: Optional[str] = None
    error_message: Optional[str] = None
    simulation: bool = True

    def to_dict(self):
        return self.model_dump()


class DebugResponse(BaseModel):
    success: bool = True
    language: str = ""
    stdout: str = ""
    stderr: str = ""
    variables: dict = {}
    execution_steps: list = []
    call_stack: list = []
    error_type: Optional[str] = None
    error_message: Optional[str] = None
    simulation: bool = True

    def to_dict(self):
        return self.model_dump()


class AutocompleteResponse(BaseModel):
    success: bool = True
    completion: str = ""
    simulation: bool = True

    def to_dict(self):
        return self.model_dump()


class BeautifyResponse(BaseModel):
    success: bool = True
    code: str = ""
    simulation: bool = True

    def to_dict(self):
        return self.model_dump()


class ErrorResponse(BaseModel):
    success: bool = False
    error: str = ""
    simulation: bool = True

    def to_dict(self):
        return self.model_dump()
