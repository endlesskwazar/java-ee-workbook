class: center, middle

# Before we start

---

class: center, middle

# JDBC


---


class: center, middle
# Що таке JDBC?

**Java DataBase Connectivity** (англ. Java DataBase Connectivity — з'єднання з базами даних на Java), скорочено JDBC) — прикладний програмний інтерфейс Java, який визначає методи, з допомогою яких програмне забезпечення на Java здійснює доступ до бази даних.

---

# Переваги JDBC

- Легкість розробки: розробник може не знати специфіки бази даних, з якою працює;
- Код не змінюється, якщо компанія переходить на іншу базу даних;
- Не треба встановлювати громіздку клієнтську програму;
- До будь-якої бази можна під'єднатись через легко описуваний URL.

---

# Концепція драйверів JDBC

В основі JDBC лежить концепція так званих драйверів, що дозволяють отримувати з'єднання з базою даних по спеціально описаному URL.

Драйвери можуть завантажуватись динамічно (під час роботи програми). Завантажившись, драйвер сам реєструє себе й викликається автоматично, коли програма вимагає URL, що містить протокол, за який драйвер «відповідає».

---

class: center, middle
# Концепція драйверів JDBC

![](../resources/img/jdbc/jdbc-img-1.jpg)

---
# Отриання з'єднання із БД

У всіх прикладах підключення до бази даних в Інтернеті ви обов'язково зустрінете ці рядки:

```java
Class.forName(driverClass);
Connection connection = DriverManager
        .getConnection(url, user, password);
```

Де:
- driverClass - це рядок з повним ім'ям класу JDBC драйвера, наприклад org.h2.Driver для H2 Database або com.mysql.jdbc.Driver для MySql.

---

# Навіщо Class.forName()?

Якщо подивитися джерельний код реалізації будь-якого драйвера він буде містити статичний блок ініціалізації такого виду:

```java
static {
    try {
        java.sql.DriverManager.registerDriver(new Driver());
    } catch (SQLException e) {
        throw new RuntimeException("Can't register driver!");
    }
}
```

Виклик Class.forName завантажує клас і цим гарантує виконання статичного блоку ініціалізації, а значить і реєстрацію драйвера в DriverManager.

---

# Основні JDBC компоненти

Основні компоненти JDBC:

- DriverManager.
- Driver.
- Connection.
- Statement.
- ResultSet.
- SQLEXception.

---

# DriverManager

---

# Driver

---

# Connection

---

# Statement

---

# ResultSet

---

# SQLException

---

# Підключення до БД

---

# Виконання запитів

---

# Різниця між Statement і PreparedStatement

---

# Виконання запитів через Statement

---

# Виконання запитів через PreparedStatement

---

# execute(), executeUpdate(), executeQuery()

---

class: center, middle
![](../resources/img/shut-up-and-show-me-some-code.jpg)