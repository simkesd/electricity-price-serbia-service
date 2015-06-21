var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    var url = 'http://www.servisinfo.com/cena-struje';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var json = { zelenaZona: "", plavaZona: "", crvenaZona: ""};

            var zelenaZona = {
                jednotarifno: '',
                visa: '',
                niza: '',
                DUT: '',
                obracunskaSnaga: '',
                naknadaZaMernoMesto: ''
            };

            zelenaZona.jednotarifno = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(2)').text());
            zelenaZona.visa = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(3)').text());
            zelenaZona.niza = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(4)').text());
            zelenaZona.DUT = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(5)').text());
            zelenaZona.obracunskaSnaga = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(6)').text());
            zelenaZona.naknadaZaMernoMesto = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(7)').text());

            var plavaZona = {
                jednotarifno: '',
                visa: '',
                niza: '',
                DUT: '',
                obracunskaSnaga: '',
                naknadaZaMernoMesto: ''
            };

            plavaZona.jednotarifno = parseFloat($('.left table tr:nth-child(4)').children(':nth-child(2)').text());
            plavaZona.visa = parseFloat($('.left table tr:nth-child(4)').children(':nth-child(3)').text());
            plavaZona.niza = parseFloat($('.left table tr:nth-child(4)').children(':nth-child(4)').text());
            plavaZona.DUT = parseFloat($('.left table tr:nth-child(4)').children(':nth-child(5)').text());
            plavaZona.obracunskaSnaga = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(6)').text());
            plavaZona.naknadaZaMernoMesto = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(7)').text());

            var crvenaZona = {
                jednotarifno: '',
                visa: '',
                niza: '',
                DUT: '',
                obracunskaSnaga: '',
                naknadaZaMernoMesto: ''
            };

            crvenaZona.jednotarifno = parseFloat($('.left table tr:nth-child(5)').children(':nth-child(2)').text());
            crvenaZona.visa = parseFloat($('.left table tr:nth-child(5)').children(':nth-child(3)').text());
            crvenaZona.niza = parseFloat($('.left table tr:nth-child(5)').children(':nth-child(4)').text());
            crvenaZona.DUT = parseFloat($('.left table tr:nth-child(5)').children(':nth-child(5)').text());
            crvenaZona.obracunskaSnaga = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(6)').text());
            crvenaZona.naknadaZaMernoMesto = parseFloat($('.left table tr:nth-child(3)').children(':nth-child(7)').text());

        }

        json = { zelenaZona: zelenaZona, plavaZona: plavaZona, crvenaZona: crvenaZona};

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(json, null, 3));
    }) ;
})

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;