from ai_engine import ai_engine


class Beautifier:
    def beautify(self, language, code):
        return ai_engine.beautify_code(language, code)


beautifier = Beautifier()
