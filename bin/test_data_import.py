import requests

authorPayload = [
	{"test": "test"},
	{"test": "test2"}
]

for payload in authorPayload:
	r = requests.put("http://localhost:9200/veto/authors", data=payload)
	print str(r.status_code) + ": " + r.content