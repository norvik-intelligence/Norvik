"""
Keyword pre-filter applied BEFORE any LLM call to minimise token spend.
Only documents containing at least one keyword are sent to classify().
"""

KEYWORDS: frozenset[str] = frozenset({
    # Abbruch / Rückbau
    "abbruch",
    "abbrucharbeiten",
    "rückbau",
    "rueckbau",
    "abriss",
    "entkernung",
    "abbruchgenehmigung",
    "abbruchunternehmen",
    "abrissgenehmigung",
    "teilabbruch",
    "rückbaumaßnahme",
    # Schadstoffe
    "asbest",
    "asbestsanierung",
    "asbestbeseiti",
    "kmf",
    "kmi",
    "mineralwolle",
    "pcb",
    "pak",
    "schwermetall",
    "schadstoff",
    "schadstoffsanierung",
    "kontaminierung",
    "altlasten",
    "bodensanierung",
    "gefahrstoff",
    "gefahrstoffe",
    "schwach gebundene asbest",
    "stark gebundene asbest",
    "asbesthaltiger",
    "trgs 519",
    "trgs519",
    "§48b",
    "freistellung",
    "entsorgungsfachbetrieb",
    # Sanierung (Gebäude)
    "kernsanierung",
    "sanierung",
    "sanierungskonzept",
    "gebäudesanierung",
    "modernisierung",
    "instandsetzung",
    # Gebäude-Hinweise auf ältere Bauten
    "altbau",
    "bestandsgebäude",
    "baujahr 19",
    "baujahr 20",
    "bj. 19",
    "bj. 20",
    # Vergabe / Planung
    "leistungsverzeichnis",
    "ausschreibung",
    "vergabe",
    "los ",
    "los:",
    "gewerk",
    "bieterverfahren",
    "ausschreibungsunterlagen",
    "leistungsbeschreibung",
    # Abfall / Transport
    "entsorgung",
    "abfallentsorgung",
    "deponierung",
    "gefährlicher abfall",
    "sonderabfall",
    "abfalltransport",
    # Gutachten
    "gutachten",
    "schadstoffgutachten",
    "erkundung",
    "bestandsaufnahme",
    "gefährdungsbeurteilung",
})


def passes_keyword_filter(text: str) -> bool:
    """Return True if the text contains at least one relevant keyword (case-insensitive)."""
    lower = text.lower()
    return any(kw in lower for kw in KEYWORDS)
