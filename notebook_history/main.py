import json
def get_all_input_cells(global_vars):
    return json.dumps({ int(key[2:]) : val
                       for key, val in global_vars.items() if key[:2] == '_i' and key[2:].isdigit()
                      })

