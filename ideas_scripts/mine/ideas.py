import csv
import os


def get_ideas():
    path = os.path.join(os.getcwd(), 'ideas_scripts', 'mine', 'failures.csv')
    print(path)
    ideas_data = csv.reader(open(path))

    result = []
    ideas_data.__next__()
    idea = ideas_data.__next__()
    while idea:
        j = {'name': idea[0], 'description': idea[2]}
        if len(idea) > 4:
            j['reason'] = idea[4]
        result.append(j)
        try:
            idea = ideas_data.__next__()
        except:
            pass

    return result
