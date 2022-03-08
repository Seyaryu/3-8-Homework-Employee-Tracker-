insert into department (name)
values ('Operations'),
        ('Sales'),
        ('Purchasing'),
        ('IT');

insert into role (title, salary, department_id)
values ('Accounts Payables', 50000, 1),
        ('Accounts Receivables', 50000, 1),
        ('Inside Sales', 90000, 2),
        ('Outside Sales', 120000, 2),
        ('Receiver', 60000, 3),
        ('Purchasing Agent', 90000, 3),
        ('Programmer', 90000, 4),
        ('Tier 1 IT', 60000, 4),
        ('Tier 2 IT', 75000, 4);

insert into employee (first_name, last_name, role_id, manager_name)
values ('David', 'Ferdinand', 9, 'Rebecca Newman'),
        ('Dennis', 'McDonald', 3, 'Donald Davis'),
        ('Luke', 'Lively', 1, null);
        