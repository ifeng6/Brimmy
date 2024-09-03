# Fetches one specific champion

import sys
import requests
import json
from bs4 import BeautifulSoup

aram_wiki_url = 'https://leagueoflegends.fandom.com/wiki/ARAM#Mode-Specific_Changes' # html id = content
target = sys.argv[1].lower()
res = []

page = requests.get(aram_wiki_url)
soup = BeautifulSoup(page.content, "html.parser")
table = soup.find("div", class_='tabber wds-tabber')

# Format based on headers (ith element in fields should match with ith element in each row)
# Should be [Champion, Damage dealt, Damage received, Other effects] based on wiki layout
fields = []
table_header = table.find_all('th')
for header in table_header:
    fields.append(header.text)

table_body = table.find_all('tr')
# Each row represents a champ
for row in table_body:
    champ_data = {} # Dict of field: value, for example, Champion: Zoe
    champ = row.find_all('td')
    # Do something with each cell
    index = 0
    for cell in champ:
        if cell.text:
            champ_data[fields[index]] = cell.text.strip() # Text have trailing whitespace
        index += 1
    # Avoid blank data
    if not champ_data:
        continue
    if champ_data[fields[0]].lower() == target or target == 'all':
        res.append(champ_data)

# Data is sent back through stdout (print)
print(str(json.dumps(res))) # Fix JSON formatting for parsing by converting single-quotes to double-quotes
sys.stdout.flush()