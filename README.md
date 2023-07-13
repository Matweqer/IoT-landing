# Состав проекта

- SCSS для стилей
- Шаблонизатор [pug](https://pugjs.org/) для html

Чтобы была красивая подсветка синтаксиса надо поставить плагин. Для этого открыть Настройки IDE PhpStorm -> Settings/Preferences (`⌘,`) -> в разделе Plugins в табе Marketplace ввести pug и нажать __install__

Полезные ссылки для ознакомления с шаблонизатором: [Template Inheritance](https://pugjs.org/language/inheritance.html), [Includes](https://pugjs.org/language/includes.html), [Mixins](https://pugjs.org/language/mixins.html)

- svgSprite на основе [svgstore](https://www.npmjs.com/package/gulp-svgstore). Просто закиньте svg в `src/img`
- [browser-sync](https://www.npmjs.com/package/browser-sync) для удобной разработке на локалке
- [Plumber](https://www.npmjs.com/package/gulp-plumber) будет перехватывать ошибки, и после устранения ошибки сборка восстановит работоспособность.
- Интегрированы стандартные фронтенерские линтеры компании. Обратите внимание на версии node и npm, они указаны в `package.json`

# NPM-скрипты

Для разработки выполнить `npm ic` и далее

- `npm run dev` — для локальной разработки
- `npm run prod` — для продакшен сборки
- `npm run lint` — для запуска линтеров. Автоматически должно запускаться перед пушем в git
- `npm run lint-fix` — автоматически исправляет часть ошибок линтеров

# LFS

В проекте подключен Git LFS для хранения бинарных форматов файлов

### Установка git lfs
* Linux: `sudo apt-get install git-lfs`
* MacOS: `brew install git-lfs`
* Можно скачать архив и установить через shell-скрипт. Подробнее [тут](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage)

### Установка git lfs в свой git
Нужно запустить один раз для одной учетной записи пользователя: `git lfs install`

### Как коммитить файлы
* Обязательно спулить в свою ветку текущий мастер.
* Проверить что есть файл `.gitattributes` — в нем написаны все форматы файлов загружаемые в LFS
* Добавляем файлы под гит, через обычный git add, коммитим и пушим.
* Идем в гитлаб и смотрим на файл в окне создания МРа, около файла должна быть метка **LFS**. Пример: 

### Как получить бинарники на локалку
Выполняем команду `git lfs fetch origin <branch>`
