import json
data = open('./zips.json', 'r')
zips = json.loads(data.read())

for gemeente, data in zips.iteritems():
    res = data["respondents"]
    print gemeente.encode('utf-8') + "," + str(data["respondents"])