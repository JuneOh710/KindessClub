options = ''
is_flat = True
for i in range(1, 12):
    for j in range(2):
        if is_flat:
            new_option = f'<option value="{i}:00">{i}:00 am</option>'
        else:
            new_option = f'<option value="{i}:30">{i}:30 am</option>'
        is_flat = not is_flat
        options += new_option

options += f'<option value="12:00">12:00 pm</option>'
options += f'<option value="12:30">12:30 pm</option>'

for i in range(1, 12):
    for j in range(2):
        if is_flat:
            new_option = f'<option value="{i+12}:00">{i}:00 pm</option>'
        else:
            new_option = f'<option value="{i+12}:30">{i}:30 pm</option>'
        is_flat = not is_flat
        options += new_option

options += f'<option value="00:00">12:00 am</option>'
options += f'<option value="00:30">12:30 am</option>'

print(options)
