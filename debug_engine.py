from ai_engine import ai_engine


class DebugEngine:
    def debug(self, language, code):
        return ai_engine.simulate_debugging(language, code)


debug_engine = DebugEngine()
