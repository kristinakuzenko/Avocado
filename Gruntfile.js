module.exports = function(grunt) {
    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "Frontend/www/assets/css/main.css": "Frontend/www/assets/less/main.less" // destination file and source file
                }
            }
        },
        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify: {
            //Загальні налаштування (grunt-browserify)
            options: {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform: [require('brfs')],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/js/"
                }
            },

            main: {
                src: 'Frontend/src/main.js',
                dest: 'Frontend/www/assets/js/main.js',
            },
            list: {
                src: 'Frontend/src/list.js',
                dest: 'Frontend/www/assets/js/list.js'
            },
            details: {
                src: 'Frontend/src/details.js',
                dest: 'Frontend/www/assets/js/details.js'
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:main', 'browserify:list', 'browserify:details']
        },
        styles: {
            files: ['Frontend/www/assets/**/*.less'], // which files to watch
            tasks: ['less'],
            options: {
                nospawn: true
            }
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    //Список завданнь по замовчування
    grunt.registerTask('default', [
        'browserify:main',
        'browserify:list',
        'browserify:details',
        'less',
        //Інші завдання які необхідно виконати
    ]);

};