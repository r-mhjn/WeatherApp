import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Spinner } from "native-base";
import Axios from "axios";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "./weatherConditions";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

// Importing api key
import apiKey from "./apiKey";
// import { apiKey } from ".env";
// ApiClient.init(apiKey);
import Config from "react-native-config";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      icon: "",
      search: "delhi",
      data: {}
    };
  }

  async componentDidMount() {
    // let city = 'delhi';
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude + " " + position.coords.longitude);
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error Getting Weather Condtions"
        });
      }
    );
  }

  fetchWeather = async (lat = 25, lon = 25) => {
    await Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`
    )
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data, isLoading: false });
      })
      .catch(err => {
        console.log("Error fetching data from api" + err);
      });
    console.log(weatherConditions[this.state.data.weather[0].main].icon);
  };

  getMinute = () => {
    var d = new Date();
    if (d.getMinutes() / 10 < 0) {
      return "0" + d.getMinutes();
    }
    return d.getMinutes();
  };
  getHour = () => {
    var d = new Date();
    if (d.getHours() / 10 < 0) {
      return "0" + d.getHours();
    }
    return d.getHours();
  };

  getDay = () => {
    var d = new Date();
    let day = days[d.getDay()];
    return day;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.progress}>
          <Spinner color="#10A881" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.pageContainer}>
          <View style={styles.topContainer}>
            <Text style={{ color: "#fff", fontSize: responsiveFontSize(3.5) }}>
              {this.state.data.name}
              {","}
              {this.state.data.sys.country}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: responsiveFontSize(2.5),
                marginVertical: 2
              }}
            >
              Last Updated {this.getHour()}
              {":"}
              {this.getMinute()}
              {", "}
              {this.getDay()}
            </Text>
            <Text style={{ color: "#fff", fontSize: responsiveFontSize(2) }}>
              Today
            </Text>
            <MaterialCommunityIcons
              size={screenWidth * 0.4}
              name={weatherConditions[this.state.data.weather[0].main].icon}
              color={"#fff"}
              style={{ marginVertical: screenHeight * 0.05 }}
            />
            <Text style={{ color: "#fff", fontSize: responsiveFontSize(4.5) }}>
              {this.state.data.weather[0].main}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: responsiveFontSize(2.5),
                marginVertical: 6
              }}
            >
              {weatherConditions[this.state.data.weather[0].main].subtitle}
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: "#fff",
              borderBottomWidth: 3,
              marginTop: screenHeight * 0.05,
              width: screenWidth * 0.8,
              marginHorizontal: screenWidth * 0.05
            }}
          />
          <View
            style={{
              flexDirection: "row",
              width: screenWidth * 0.8,
              marginHorizontal: screenWidth * 0.05
            }}
          >
            <View
              style={{
                flexDirection: "column",
                // borderWidth: 1,
                // borderColor: '#fff',
                width: screenWidth * 0.37,
                justifyContent: "center",
                alignItems: "flex-end",
                marginRight: screenWidth * 0.06
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: responsiveFontSize(8),
                  fontWeight: "100"
                }}
              >
                {this.state.data.main.temp.toFixed(0)}
                {"\u00B0"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                // alignContent: 'flex-end',
                // borderWidth: 1,
                // borderColor: '#fff',
                width: screenWidth * 0.37,
                justifyContent: "center",
                alignItems: "flex-start",
                height: screenHeight * 0.18
              }}
            >
              <View style={{ flexDirection: "row", marginVertical: 1 }}>
                <MaterialCommunityIcons
                  size={22}
                  name="water"
                  color={"#fff"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }}
                >
                  {this.state.data.main.humidity}
                  {"%"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginVertical: 1 }}>
                <MaterialCommunityIcons
                  size={22}
                  name="weather-windy"
                  color={"#fff"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }}
                >
                  {this.state.data.wind.speed}
                  {"m/s"}
                </Text>
              </View>

              <View style={{ flexDirection: "row", marginVertical: 1 }}>
                <MaterialCommunityIcons
                  size={22}
                  name="gauge"
                  color={"#fff"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{ color: "#fff", fontSize: responsiveFontSize(1.8) }}
                >
                  {this.state.data.main.pressure}
                  {"hPa"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#73c2fb",
    marginTop: 31
  },
  pageContainer: {
    marginVertical: screenHeight * 0.1,
    marginHorizontal: screenWidth * 0.05,
    // borderWidth: 1,
    width: screenWidth * 0.9,
    height: screenHeight * 0.8
    // borderColor: '#fff',
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: screenHeight * 0.05,
    height: screenHeight * 0.55
  }
});
