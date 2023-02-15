import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import MdPhone from '@mui/icons-material/Phone';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import Progress from "./Progress";
import MakeDonation from "./makeDonation";
// import FCES from "./fces.jpeg"; 

const FCES = require("../images/fces.jpeg");
const VdCash = require("../images/vd-cash.png") as string;
const Device = require("../images/device.jpg") as string;
// const Innov = require("../images/aya.jpg") as string;
const Innov2 = require("../images/tatowa2.jpg") as string;

const Icons = () => {
  return (
    <>
    <MdPhone />
    <img src={VdCash} alt={"vodafone cash"} style={{width: "30px"}}/>
    </>
  )
}
function Card1() {
  return (
    <Card id="main" sx={{ maxWidth: '100%', display: 'flex',  flexDirection: { xs: "column", md: "row" }, textAlign: 'right', marginBottom: "3rem" }}>
      
      <CardMedia
        component="img"
        // height="300"
        sx={{height: {xs: 'auto', md: "300px"}}}
        // width='150px'
        image={FCES}
        alt="green iguana"
      />
<Box > 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
    مبادرة كلية التجارة شعبة اللغة الانجليزية بجامعة جنوب الوادى بقنا - دفعة 2023  لشراء جهاز طبى لوحدة المناظير الجديدة بمستشفى قنا العام
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end',  display: 'flex',  flexDirection: { xs: "column", md: "row" },}}>
        
        <Chip icon={<Icons />} sx={{padding: "1rem", margin: "1rem", color: "white", backgroundColor: "#1976D2"}}label="01016126167" />
        {/* <a href="tel:01016126167" style={{    textDecoration: "none"}}>
        <Button size="small" variant="contained">
          <MdPhone />
          01016126167
        </Button>
        </a> */}
        {/* <Button size="small" variant="contained" sx={{margin: {xs: "1rem"}}}>استكشف</Button> */}
          <Link href="/allres">
        <Button size="small" variant="contained">
          فريق العمل
          </Button>
          </Link>
      </CardActions>
      </Box>
    </Card>
  );
}
function Card2() {
  return (
    <Card sx={{ maxWidth: '100%', display: 'flex',  flexDirection: { xs: "column", md: "row" }, textAlign: 'right',marginBottom: "3rem",  marginTop: "3rem"}}>
      
<Box > 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
الهدف من المبادرة هو جمع سهم واحد من كل طالب من دفعة 2023 قيمة كل سهم 100 جنية يتم دفعها مرة واحده او مقسمة، وذلك لشراء جهاز لوحدة المناظير الجديدة بمستشفى قنا العام، كما انه يتاح جمع التبرعات لمن هو خارج الدفعة حيث ان المبادرة تهدف لعمل خيرى اولا واخيرا
        </Typography>
      </CardContent>

      </Box>
            <CardMedia
        component="img"
        // height="300"
        sx={{height: {xs: 'auto', md: "300px"}}}
        // width='150px'
        image={Innov2}
        alt="Innov"
      />
    </Card>
  );
}
const Card3 = () => {
  return (
        <Card sx={{ maxWidth: '100%', display: 'flex',  flexDirection: { xs: "column", md: "row" }, textAlign: 'right',marginBottom: "3rem",  marginTop: "3rem"}}>
      <CardMedia
        component="img"
        // height="300"
        sx={{height: {xs: 'auto', md: "300px"}}}
        // width='150px'
        image={Device}
        alt="Device"
      />
<Box > 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
هى وحدة ملحقة بمستشفى قنا العام تخدم ابناء الصعيد،وتقدم خدمات طبية فى تخصص الجراحة العامة وجراحات الاورام بالمجان  
        </Typography>
      </CardContent>

      </Box>
            
    </Card>
  )
}


const Home = () => {
  return (
    <>
    <Card1/>
     <Divider>
      <h2 id="about">
        عن المبادرة
      </h2>
     </Divider>
    <Card2/>
         <Divider>
      <h2 id="about-new-device">
ما هى وحدة المناظير الجديدة
      </h2>
     </Divider>
    <Card3 />
    <Progress />
    <Divider>
      <h2 id="about-new-device">
سجل تبرعك
    </h2>
     </Divider>
     <MakeDonation />
    </>
  )
}
export default Home;