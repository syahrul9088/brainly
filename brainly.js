const fetch = require('node-fetch');
const delay = require('delay');
const moment = require('moment')
const cheerio = require('cheerio');
const { URLSearchParams } = require('url');
const readline = require("readline-sync");
const chalk = require('chalk');

const functionSearch = (ask) => new Promise((resolve, reject) => {
    const bodys = {
      "operationName":"SearchQuery","variables":{"query":`${ask}`,"after":null,"first":10},"query":"query SearchQuery($query: String!, $first: Int!, $after: ID) {\n  questionSearch(query: $query, first: $first, after: $after) {\n    count\n    edges {\n      node {\n        id\n        databaseId\n        author {\n          id\n          databaseId\n          isDeleted\n          nick\n          avatar {\n            thumbnailUrl\n            __typename\n          }\n          rank {\n            name\n            __typename\n          }\n          __typename\n        }\n        content\n        answers {\n          nodes {\n            thanksCount\n            ratesCount\n            rating\n            __typename\n          }\n          hasVerified\n          __typename\n        }\n        __typename\n      }\n      highlight {\n        contentFragments\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
     }
   
       fetch('https://brainly.co.id/graphql/id', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
        'Host': 'brainly.co.id',
        'accept': '*/*',
        'Origin': 'https://brainly.co.id',
        'batch': true,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        'content-type': 'application/json',
        'Referer': `https://brainly.co.id/app/ask?entry=hero&q=${ask}`,
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': '__cfduid=d33cc181c4fdaaa75fa4d1ae62fd425f01571791107; _ga=GA1.3.1667250869.1571791112; _gid=GA1.3.408113826.1571791112; _hjid=c005bd1f-024f-4c61-9a2c-480cbee46280; hl=id; experimentId=7c5b1bbb44aa41ef5d1c63a42225d79dddda38fb59366d4e24c25edd3d26c1e1; Zadanepl_cookie[Token][Guest]=232c76b8fc16ab2556c0bb8fa8bc86c798ef9fd1986caf16c55a800d5bd1baa8f2590776d912af25; __gads=ID=449800436e01b628:T=1571791132:S=ALNI_MYLSTtoQiGH7AuVHlkob3yn_Z2zxg; _dc_gtm_UA-43911963-1=1'
           }
       })
       .then(res => res.json())
       .then(result => {
      //  const $ = cheerio.load(result);
        // const resText = $('h7').text();
           resolve(result);
       })
       .catch(err => reject(err))
   });
   
  (async () => {
      try {
        console.log(chalk.yellow('Scrapping Questions From Brainly\nCreated By SYG\n'))
        const ask = readline.question("Question (Ex: indonesia)?: ")
        for (var i=0; i < 8; i++) {
        const search = await functionSearch(ask);
        var data = search.data.questionSearch.edges[`${i}`].node.content;
        const asd = chalk.yellow(`Question ${i}:\n`)
        console.log("")
        console.log(chalk.green(`${asd}${data}`))
        console.log("")
        }
        console.log(chalk.yellow('Thanks for using'))
      } catch (e) {
          console.log(e)
    }
    
  })()
