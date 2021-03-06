# JDBC



## JDBC. Що і навіщо?


## JDBC. Що і навіщо?
**Java DataBase Connectivity** (англ. Java DataBase Connectivity — з'єднання з базами даних на Java), скорочено JDBC) — прикладний програмний інтерфейс Java, який визначає методи, з допомогою яких програмне забезпечення на Java здійснює доступ до бази даних. JDBC — це платформо-незалежний промисловий стандарт взаємодії Java-застосунків з різноманітними СУБД, реалізований у вигляді пакета java.sql, що входить до складу Java SE.


### JDBC. Що і навіщо?
Переваги JDBC:
- Легкість розробки: розробник може не знати специфіки бази даних, з якою працює;
- Код не змінюється, якщо компанія переходить на іншу базу даних;
- Не треба встановлювати громіздку клієнтську програму;
- До будь-якої бази можна під'єднатись через легко описуваний URL.



## Концепція драйверів


### Концепція драйверів

В основі JDBC лежить концепція так званих драйверів, що дозволяють отримувати з'єднання з базою даних по спеціально описаному URL. Драйвери можуть завантажуватись динамічно (під час роботи програми). Завантажившись, драйвер сам реєструє себе й викликається автоматично, коли програма вимагає URL, що містить протокол, за який драйвер «відповідає».
  

### Концепція драйверів
Нижче наведено архітектурну діаграму, яка показує розташування менеджера драйверів щодо драйверів JDBC та програми Java.
![](../resources/img/jdbc/jdbc-img-1.jpg)


### Концепція драйверів
У всіх прикладах підключення до бази даних в Інтернеті ви обов'язково зустрінете ці рядки:

```java
Class.forName(driverClass);
Connection connection = DriverManager
        .getConnection(url, user, password);
```

Де driverClass - це рядок з повним ім'ям класу JDBC драйвера, наприклад org.h2.Driver для H2 Database або com.mysql.jdbc.Driver для MySql.


### Концепція драйверів
Всі основні сутності в JDBC API, з якими вам доведеться працювати, є інтерфейсами:

- Connection;
- Statement;
- PreparedStatement;
- CallableStatement;
- ResultSet;
- Driver;
- DatabaseMetaData.


### Концепція драйверів
JDBC драйвер конкретної бази даних як раз і надає реалізації цих інтерфейсів.

DriverManager - це Singlton, який містить інформацію про всі зареєстровані драйвери. Метод getConnection на підставі параметра URL знаходить java.sql.Driver відповідної бази даних і викликає у нього метод connect.


### Концепція драйверів
Так а навіщо ж виклик Class.forName ()?

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



## Основні JDBC компоненти


### Основні JDBC компоненти

Основні компоненти JDBC:
- DriverManager.
- Driver.
- Connection.
- Statement.
- ResultSet.
- SQLEXception.


### DriverManager

Клас DriverManager є рівнем управління в JDBC і знаходиться між користувачем і драйверами. Він відстежує всі доступні драйвери і управляє встановленням з'єднань між БД і відповідним драйвером. До того ж, клас DriverManager піклується про такі речі, як максимальний час підключення до БД і інше.

Для простих додатків єдиний корисний метод в цьому класі - це DriverManager.getConnection.


### Driver

Цей інтерфейс обробляє зв'язок із сервером бази даних. Ви будете взаємодіяти безпосередньо з об'єктами Driver дуже рідко. Замість цього ви використовуєте об'єкти DriverManager, які керують об'єктами цього типу.


### Connection

Об'єкт Connection являє собою контекст зв'язку, тобто весь зв'язок із базою даних здійснюється лише через об'єкт з'єднання.


### Statement

Об'єкти, створені з цього інтерфейсу, використовуються для надсилання SQL-запитів до бази даних. Деякі похідні інтерфейси приймають параметри, крім виконання збережених процедур.


### ResultSet 

Об'єкти ResultSet зберігають дані, отримані з бази даних після того, як ви виконуєте SQL-запит за допомогою об'єктів Statement. Він діє як ітератор, який дозволяє вам переміщатися за своїми даними.


### SQLException

Цей клас обробляє будь-які помилки, що виникають у додатку до бази даних.
SQLException є checked винятком і його всюди треба тягнути або обертати в try catch.



## Використання JDBC


### Налаштування середовища

JDBC API знаходиться в Java SE, а це означає, що для роботи з ним нам не потрібно завантажувати якісь бібліотеки, що не можна сказати про самих постачальників драйверів.


### Налаштування середовища

В залежності від того з якою базою даних ми працюємо потрібно завантажити відповідний jar - файл, або додати залежність, якщо використовується система сборки, на постачальника драйверів.

Наприклад, скачати jar - файл драйвера можна за посиланнями:
- MySQL – http://dev.mysql.com/downloads/connector/j/
- PostqreSLQ – http://jdbc.postgresql.org/download.html
- Oracle – http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html



## З'єднання із базою даних


### Підключення до Mysql

```java
Class.forName("org.postgresql.Driver");
Connection connection = DriverManager.getConnection("jdbc:postgresql://hostname:port/dbname","username", "password");
connection.close();
```


### Підключення до Oracle
```java
Class.forName("oracle.jdbc.driver.OracleDriver");
Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:mkyong","username","password");
connection.close();
```



## Виконання запитів


### Виконання запитів

Для виконання запитів за допомогою JDBC можна використати Statement або PreparedStatement.

У PreparedStatement ви задаєте запит, в якому можете змінювати будь-які параметри. Наприклад, ваш запит повинен виконатися кілька разів з різними параметрами. Тоді це зручніше і швидше. У PreparedStatement всі строкові параметри автоматично перетворюються в рядки з escape-послідовностями. Зокрема, немає ніяких проблем з рядками, які містять лапки. А при використанні складання рядків і Statement вам про це треба дбати самим або ви отримаєте SQL injection.


### Виконання запитів

```java
String sql = "select * from users where name = ?";
PreparedStatement preparedStatement = connection.preparedStatement(sql);
preparedStatement.setString(1, "value");
```


### Виконання запитів

Створення Statement:
```java
Statement statement = connection.createStatement();
statement.executeQuery("select* from users");
```


### Виконання запитів
Існує кілька способів виконувати SQL-запити в залежності від типу цього запиту. Для цього у інтерфейсу Statement існує три різних методи: **executeQuery ()**, **executeUpdate ()**, а також **execute ()**. Розглянемо їх окремо.


### Виконання запитів

Самий базовий метод **executeQuery ()** необхідний для запитів, результатом яких є один єдиний набір значень, таких як у запитів SELECT. Повертає ResultSet, який не може бути null навіть якщо у результату запиту не було знайдено значень.


### Виконання запитів

Метод **execute ()** використовується, коли оператори SQL повертають більше одного набору даних, більше одного лічильника оновлень і інше. Метод повертає true, якщо результатом є ResultSet, як у запиту SELECT. Поверне false, якщо ResultSet відсутня, наприклад при запитах виду Insert, Update. 


### Виконання запитів

Метод **executeUpdate ()** використовується для виконання операторів INSERT, UPDATE або DELETE, а також для операторів DDL (Data Definition Language - мова визначення даних), наприклад, CREATE TABLE і DROP TABLE. Результатом оператора INSERT, UPDATE, або DELETE є модифікація однієї або більше колонок в нулі або більше рядках таблиці. Метод executeUpdate () повертає ціле число, що показує, скільки рядків було модифіковано. Для виразів типу CREATE TABLE і DROP TABLE, які не оперують над рядками, що повертається методом executeUpdate () значення завжди дорівнює нулю.



##
![](../resources/img/shut-up-and-show-me-some-code.jpg)