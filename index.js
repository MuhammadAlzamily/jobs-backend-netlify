const app = require('express')();
const cors = require('cors');
const { default: axios } = require('axios');
const cheerio = require('cheerio');

app.use(cors());

const jobs = []

const FetchJobs = async () => {
    const source = await axios.get("https://www.indeed.com/q-Python-jobs.html");
    const $ = cheerio.load(source.data);
    $('h2 a').each((i, el) => {
        jobs[i] = { title: $(el).text(), joblink: 'https://indeed.com' + $(el).attr('href') };
    })
    return jobs;
}

app.get('/', async (req, res) => {
    FetchJobs().then(stuff => {
        console.log(stuff);
        res.json(stuff);
    })
})

app.listen(5000, () => console.log("Server is up and running....."));