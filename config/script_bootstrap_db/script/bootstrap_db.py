import mysql.connector
from faker import Faker
import os

try:

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

    fake = Faker()
    val = []

    for _ in range(500):

        email = fake.unique.email()
        username = fake.unique.user_name()
        last_name = fake.unique.last_name()
        first_name = fake.unique.first_name()
        password_hash = fake.unique.password()

        val.append((email, username, last_name, first_name, password_hash))



    mycursor = mydb.cursor()

    sql = "INSERT INTO User (email, username, last_name, first_name, password_hash) VALUES  (%s, %s, %s, %s, %s)"

    mycursor.executemany(sql, val)

    mydb.commit()

except Exception as e:

    print(f'{str(e)}')
    exit(1)


print(mycursor.rowcount, "was inserted.") 