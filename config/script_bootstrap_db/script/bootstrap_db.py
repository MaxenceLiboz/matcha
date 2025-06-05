import mysql.connector
from faker import Faker
import random
import os

try:

    # CREATING A CONNECTION TO THE DATABASE

    db_host = os.environ.get("MYSQL_HOST", 'db')
    db_user = os.environ.get("MYSQL_USER")
    db_pass = os.environ.get("MYSQL_PASSWORD")
    db_port = int(os.environ.get("MYSQL_PORT", 3306))
    db_name = os.environ.get("MYSQL_DATABASE")
    
    mydb = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_pass,
        port=db_port,
        database=db_name
    )

    mycursor = mydb.cursor()

    # CLEARING THE DATABASE

    mycursor.execute(f'USE {db_name}')
    mycursor.execute("SHOW TABLES")

    rows = mycursor.fetchall()

    mycursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    for row in rows:
        mycursor.execute(f'TRUNCATE {row[0]}')

    mycursor.execute("SET FOREIGN_KEY_CHECKS = 1")

    # FILLING THE USER TABLE

    fake = Faker()
    
    val = []

    for _ in range(500):

        email = fake.unique.email()
        username = fake.unique.user_name()
        last_name = fake.unique.last_name()
        first_name = fake.unique.first_name()
        password_hash = fake.unique.password()

        val.append((email, username, last_name, first_name, password_hash))

    sql = "INSERT INTO User (email, username, last_name, first_name, password_hash) VALUES  (%s, %s, %s, %s, %s)"

    mycursor.executemany(sql, val)

    # FILLING THE PROFILE TABLE

    val.clear()
    genders = ["Male", "Female", "Other"]
    sexual_preferences = ["Heterosexual", "Homosexual", "Other"]

    for i in range(500):

        user_id = i + 1
        age = random.randint(18, 80)
        gender = random.choice(genders)
        sexual_preference = random.choice(sexual_preferences)

        val.append((user_id, age, gender, sexual_preference))

    sql = "INSERT INTO Profile (user_id, age, gender, sexual_preference) VALUES  (%d, %d, %s, %s)"

    mycursor.executemany(sql, val)

    mydb.commit()

except Exception as e:

    print(f'{str(e)}')
    exit(1)


print(mycursor.rowcount, "was inserted.") 