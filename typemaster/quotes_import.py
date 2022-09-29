import os
from queue import Empty

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "typemaster.settings")

import django
django.setup()

import pandas as pd
from api.models import Quote

filename = 'quotes.csv'
df = pd.read_csv(filename)



for index, row in df.head(10000).iterrows():
    text=row.quote
    quotee=row.quotee
    source=row.source if isinstance(row.source, str) else ""
    tags=row.tags
    quote = Quote(text=text, quotee=quotee, source=source, tags=tags)
    quote.save()
    print(index+1)

# print(df.columns)