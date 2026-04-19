#!/usr/bin/env python3
"""
Parse PDF and extract all airports, then compare with existing database.
"""
import re
import json
from typing import List, Dict, Tuple

def parse_pdf_data() -> List[Dict]:
    """
    Parse PDF data manually based on the visual structure.
    Returns list of all airports from PDF.
    """
    # Based on the PDF screenshots, I can see the structure
    # Each row has: L.p., Nazwa, Województwo, Rodzaj, Współrzędne geograficzne, Kod ICAO, Operator

    airports = []

    # I'll parse this manually from the PDF content shown
    # Page 1 entries 1-38
    # Page 2 entries 39-76
    # etc.

    # This is a sample structure - I need to parse ALL 586 entries
    # Let me create a comprehensive parser

    return airports


def dms_to_decimal(lat_str: str, lon_str: str) -> Tuple[float, float]:
    """
    Convert DMS coordinates to decimal format.
    Format: "52°10′00,0″ N 020°50′00,0″ E"
    """
    def parse_dms(dms: str) -> float:
        # Extract degrees, minutes, seconds
        match = re.match(r'(\d+)[°\s]+(\d+)[′\'\s]+(\d+[,\.]\d+)[″"\s]*', dms)
        if match:
            degrees = float(match.group(1))
            minutes = float(match.group(2))
            seconds = float(match.group(3).replace(',', '.'))
            return degrees + minutes/60 + seconds/3600
        return 0.0

    lat = parse_dms(lat_str)
    lon = parse_dms(lon_str)

    # Handle direction
    if 'S' in lat_str.upper():
        lat = -lat
    if 'W' in lon_str.upper():
        lon = -lon

    return lat, lon


def load_existing_airports() -> Dict:
    """
    Load existing airports from the TypeScript file.
    """
    existing = {
        'by_name': {},
        'by_icao': {},
        'by_coords': {}
    }

    with open('/Users/mateuszpalanis/WebstormProjects/lataj-w-polsce/client/app/const/airports.ts', 'r', encoding='utf-8') as f:
        content = f.read()

        # Extract airport objects
        pattern = r'\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*icao:\s*"([^"]*)"(?:,\s*supportedVehicles:\s*\[([^\]]+)\])?(?:,\s*reporter:\s*"([^"]*)")?,\s*position:\s*\{\s*latitude:\s*([\d.]+),\s*longitude:\s*([\d.]+)\s*\}\s*\}'

        matches = re.findall(pattern, content)

        for match in matches:
            id_num, name, atype, icao, vehicles, reporter, lat, lon = match

            key = name.lower().strip()
            existing['by_name'][key] = {
                'id': int(id_num),
                'name': name,
                'type': atype,
                'icao': icao,
                'lat': float(lat),
                'lon': float(lon)
            }

            if icao and icao != '-':
                existing['by_icao'][icao.lower()] = True

            # Round coordinates for comparison
            coord_key = (round(float(lat), 4), round(float(lon), 4))
            existing['by_coords'][coord_key] = True

    return existing


if __name__ == '__main__':
    # First, let's see what we're working with
    existing = load_existing_airports()
    print(f"Loaded {len(existing['by_name'])} existing airports")
    print(f"Last ID should be 290")
