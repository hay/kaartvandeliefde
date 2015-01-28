import csv, json

filters = {
    "sex"         : "V002",
    "age"         : "V003",
    "relation"    : "V012",
    "orientation" : "V008",
    "religion"    : "V067",
    "income"      : "V007",
    "province"    : "V005",
    "zip"         : "V088"
}

questions = [
    "V013_1",
    "V013_2",
    "V023_3",
    "V024_1",
    "V024_2",
    "V025_1",
    "V025_4",
    "V027_1",
    "V027_2",
    "V027_4",
    "V027_5",
    "V028",
    "V048_1",
    "V048_2",
    "V051_1",
    "V051_2",
    "V052_1",
    "V052_4",
    "V053_1",
    "V053_2",
    "V053_3",
    "V054",
    "V075",
    "V082",
    "V084_3",
    "V085_3",
    "V086_2",
    "V086_3",
    "V086_4",
    "V087_2",
    "V087_3",
    "V122"
]

def filter_sex(data):
    return ["male", "female"][data - 1]

def filter_age(data):
    return data

def filter_relation(data):
    if data <= 3:
        return "single"
    else:
        return "relation"

def filter_orientation(data):
    return ['hetero', 'gay', 'bi'][data - 1]

def filter_religion(data):
    return ["catholic", "protestant", "jewish", "islamic", "other", "atheist"][data - 1]

def filter_income(data):
    return ["belowaverage", "average", "aboveaverage"][data - 1]

def filter_province(data):
    # TODO
    return data

def filter_zip(data):
    return data

def read_csv(file):
    f = open(file, "r")
    reader = csv.DictReader(f)

    for row in reader:
        yield row

def get_zip():
    postcodes = []

    for row in read_csv("./postcodes.csv"):
        row["postcode"] = int(row["postcode"])
        postcodes.append( row )

    return postcodes

def get_filters(row):
    fdict = {}

    for filt, question in filters.iteritems():
        if question in row:
            data = row[question]

            if data.isdigit():
                data = int(data)

            fn = globals()["filter_" + filt]
            fdict[filt] = fn(data)
        else:
            fdict[filt] = None

    return fdict

def get_answers(row):
    answers = {}

    for question in questions:
        answer = row.get(question, None)

        if answer.isdigit():
            answer = int(answer)

        if answer == None or answer == 99999:
            answers[question] = None
        else:
            answers[question] = answer

    return answers

def get_survey():
    records = []

    for csvfile in ["./data-old.csv", "./data.csv"]:
        for row in read_csv(csvfile):
            # There's a problem with the old data because a question id has
            # been changed, from V081 to V122, so we replace that here
            if "V081" in row:
                row["V122"] = row["V081"]

            records.append({
                "filters" : get_filters(row),
                "answers" : get_answers(row)
            })

    return records

def main():
    zips = get_zip()
    surveys = get_survey()

    data = {
        "zip" : zips,
        "survey" : surveys
    }

    f = file("../web/data/data.json", "w")
    f.write( json.dumps(data) )
    f.close()

if __name__ == "__main__":
    main()