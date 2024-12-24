import { useState } from "react";
import { connect } from 'react-redux';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Mains from "./Mains";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../App.css";
import "./main.css";


const sections = [
  { title: "Dashboard", url: "/dashboard" },
];

const mainFeaturedPost = {
  title: "Drive Green, Breathe Easy with Verdefy",
  description: "Offset your vehicle's carbon footprint, effortlessly.",
  image: "https://source.unsplash.com/random/?road&driving",
  imageText: "main image description",
  // linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "The Verdefy Difference",
    date: "",
    description:
      "We believe small choices create a big impact. Verdefy makes taking responsibility for your vehicle's environmental footprint seamless and affordable. For just a few extra dollars per month, you can neutralize the emissions of your car, truck, or SUV. Join a community driving towards a more sustainable future, knowing you're making a tangible difference while investing in cutting-edge green technologies that actively reduce greenhouse gases and combat climate change. Fuel innovation, not your carbon footprint.",
    image: "https://loremflickr.com/600/400/ecosystem?random=1",
    imageLabel: "Image Text",
  },
  {
    title: "Understanding Carbon Footprints",
    date: "",
    description:
      "Every mile matters. Your car's carbon footprint reflects the greenhouse gases it emits, contributing to climate change. From fuel consumption to tailpipe emissions, it all adds up. Verdefy channels your contributions into verified carbon offset projects like renewable energy, reforestation, and energy-efficient technologies. These projects neutralize the emissions associated with your driving, creating a balanced ecosystem where your love for the road doesn't compromise your love for the planet.",
    image: "https://loremflickr.com/600/400/ecosystem?random=2",
    imageLabel: "Image Text",
  },
];

const posts = ["Read more →"];

const sidebar = {
  title: "Want to keep in touch?",
  description: "Telephone: 1-855-VERDEFY (1-855-837-3339)",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "X", icon: XIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Main = ({ givenName }) => {

  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            // title="Verdefy"
            sections={sections}
            givenName={givenName}
          />
          <main style={{ position: 'relative' }}>
            {loading && <Box sx={{ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, background: '#eee', zIndex: 10, opacity: 0.5 }}></Box>}
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Mains
                title="Still not convinced? Take a look at the companies we believe in and how our customers are already driving towards a greener future."
                posts={posts}
              />
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid>
            {loading && <CircularProgress size={24} color="primary" sx={{
              'position': 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
              zIndex: 10
            }} />}
          </main>
        </Container>
        <Footer
          title="Verdefy"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  givenName: state.auth.user.given_name,
  // ...add other state properties if needed
});

export default connect(mapStateToProps)(Main);