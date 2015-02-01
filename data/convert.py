import csv, json, sys

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

# Questions that consist of a tuple with two values will be thrown together
questions = (
    # Liefde
    "V010",
    "V076",
    "V038",
    "V087_2",
    "V086_4",
    ("V084_3", "V085_3"),
    ("V065", "V073"),
    "V075",
    "V074",
    "V089",
    # Lust
    ("V082", "V122"),
    ("V025_4", "V052_4"),
    ("V023_1", "V050"),
    ("V025_2", "V052_2"),
    ("V024_1", "V051_1"),
    "V083",
    # Angst
    "V053_3",
    ("V013_2", "V048_2"),
    "V053_1",
    "V027_1",
    "V053_2",
    "V027_5",
    "V027_4",
    # Only combination
    "V023_3"
)

to_normalize = (
    "V087_2",
    "V086_4",
    "V084_3-V085_3",
    "V025_4-V052_4",
    "V023_1-V050",
    "V025_2-V052_2",
    "V024_1-V051_1",
    "V053_3",
    "V053_1",
    "V027_1",
    "V053_2",
    "V027_5",
    "V013_2-V048_2",
    "V027_4"
)

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

def normalize_answer(answer):
    if answer == 1 or answer == 2: return 1
    if answer == 3: return 2
    return 3

def add_combinations(answers):
    combo = [answers[q] for q in ["V023_3", "V086_4", "V087_2"]]
    combo = map(normalize_answer, combo)
    answers["C1"] = int(round(sum(combo) / len(combo)))
    return answers

def normalize_answers(answers):
    for question in to_normalize:
        answer = answers[question]

        if answer is not None:
            answers[question] = normalize_answer(answer)

    return answers

def get_answers(row):
    answers = {}

    for question in questions:
        # Combine questions?
        if isinstance(question, tuple):
            # Could probably be easier
            a1 = row.get(question[0], None)
            a2 = row.get(question[1], None)

            if a1 == "99999":
                answer = a2
            else:
                answer = a1

            question = "-".join(question)
        else:
            answer = row.get(question, None)

        if answer is not None and answer.isdigit():
            answer = int(answer)

        if answer == None or answer == 99999:
            answers[question] = None
        else:
            answers[question] = answer

    answers = add_combinations(answers)
    answers = normalize_answers(answers)

    # Fix this question
    if answers["V010"] == "99999" or answers["V010"] is None:
        answers["V010"] = 0

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

    if len(sys.argv) > 1 and sys.argv[1] == "indent":
        indent = 4
    else:
        indent = None

    jsondata = json.dumps(data, indent = indent)

    f = file("../web/data/data.json", "w")
    f.write(jsondata)
    f.close()

if __name__ == "__main__":
    main()