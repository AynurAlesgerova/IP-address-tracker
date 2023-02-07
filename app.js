const input=document.querySelector("input")
const form=document.querySelector("form")
let info = null
var map = L.map('map')
var marker
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
if (input.value.length<=0) {
    getMyIP()
}
async function getMyIP(){
    let loc= await fetch('https://api.ipify.org/?format=json', { method: 'GET' })
    let data =  await loc.json()
    getAddress(data.ip)
}
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    getAddress(input.value)
    input.value=""
})
async function  getAddress(ipAdress){
    // if(typeof(input.value)== number){
        const location = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_3ABdh2hDkV9KvZAq1udD0gsy38mNu&ipAddress=${ipAdress}`)
        let info =  await location.json()
        // console.log(info);
        showAllData(info)
        if (info) {
            findLocation(info)
        }
    // }
}
function findLocation(info){
        let lat= info.location.lat
        let lng= info.location.lng
        map.setView([info.location.lat, info.location.lng], 13);
        marker = L.marker([info.location.lat, info.location.lng]).addTo(map);
        var circle = L.circle([info.location.lat, info.location.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}
function showAllData(info){
    const ip_adrs= document.querySelector(".ip-adrs span")
    const location= document.querySelector(".location span")
    const timezone= document.querySelector(".timezone span")
    const ISP= document.querySelector(".ISP span")
    ip_adrs.innerHTML=info.ip
    location.innerHTML=info.location.region
    timezone.innerHTML=info.location.timezone
    ISP.innerHTML=info.isp
}