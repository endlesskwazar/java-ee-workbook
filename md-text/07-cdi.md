# CDI

# Зміст

${toc}

# Приклад

Уявіть собі, що ми проектуємо систему в, якій кожного місяця потрібно виводити статистику на екран(статистику продаж тощо).
Нехай цей об'єкт буди мати інтерфейс:

```java
public interface StatisticReporter {
	void report();
}
```

Все доволі просто, об'єкт буде мати один метод в інтерфейсі report(), який і виводить статистику на екран.

Користовуч може забажати мати статистику в різних форматах - HTML, XML, DOC. Для цих цілей ми введимо в системі інтерфейс:

```java
public interface Formatter {
	String format(String text);
}
```

І Зробимо декілька реалізації:

```java
public class HtmlFormatter implements Formatter {

	public String format(String text) {
		return "HTml format";
	}

}
```

```java
public class XMLFormatter implements Formatter {

	public String format(String text) {
		return "Xml format";
	}

}
```

І нерешті зробимо реалізацію StatisticReporter:

```java
public class StatisticReporterImpl implements StatisticReporter {
	
	HtmlFormatter formatter = new HtmlFormatter();
	
	public void report() {
		String report = "This is report";
		String outRep = formatter.format(report);
		System.out.print(outRep);
	}

}
```

Тестуємо систему:

```java
public class Main {
	
	public static void main(String[] args) {
		StatisticReporterImpl statisticReporterImpl = new StatisticReporterImpl();
		statisticReporterImpl.report();
	}
}
```

Якщо ми пышли таки шляхом, для того щоб виводити статистику в ыншому форматы нам, або доведеться змінювати реалізацію 
statisticReporterImpl, або створювати ще один клас, який реалізує StatisticReporter.

Можна підти і іншим шляхом, замість того щоб створювати об'єкт Formatter всередині StatisticReporterImpl можна передати його ззовні:

```java
package test;

public class StatisticReporterImpl implements StatisticReporter {
	
	private Formatter formatter;
	
	public StatisticReporterImpl(Formatter formatter) {
		this.formatter = formatter;
	}
	
	public void report() {
		String report = "This is report";
		String outRep = formatter.format(report);
		System.out.print(outRep);
	}

}
```
```java
public class Main {
	
	public static void main(String[] args) {
		Formatter formatter = new HtmlFormatter();
		StatisticReporterImpl statisticReporterImpl = new StatisticReporterImpl(formatter);
		statisticReporterImpl.report();
	}
}
```

Тепер, для того щоб змінити формат статистики нам потрібно підставити одну із реалізації інтерфейсу Formatter.



# Що таке Dependency injection?

**Впровадження залежності** (англ. Dependency injection, DI) — шаблон проектування програмного забезпечення, що передбачає надання зовнішньої залежності програмному компоненту, використовуючи «інверсію управління» (англ. Inversion of control, IoC) для розв'язання (отримання) залежностей.

Впровадження — це передача залежності (тобто, сервісу) залежному об'єкту (тобто, клієнту). Передавати залежності клієнту замість дозволити клієнту створити сервіс є фундаментальною вимогою до цього шаблону проектування.

# Що собою представляє CDI в Java?

CDI є стандартом Java для ін'єкцій залежностей (DI) і перехоплення (AOP).

CDI з'явився в Java EE 6, щоб забезпечити доступ до деяких доступних функцій EJB тільки для всіх компонентів, керованих контейнером. Таким чином, CDI bean охоплює сервлети, веб-службу SOAP, веб-службу RESTful, об'єкти, EJB і т.д.

# Домашня робота

## Варінти

# Контрольні запитання

# Додаткові матеріали

## Открытый вебинар Java Enterprise "CDI in action"
[![](../resources/img/cdi/img-1.png)](https://www.youtube.com/watch?v=-kto09UEBNo&t=4424s&index=2&list=PLek9OG9m4BxpYC4Ds56KANEvXs0F9AuWi)


