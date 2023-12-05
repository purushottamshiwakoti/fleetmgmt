import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import {
  Button,
  DataTable,
  Provider as PaperProvider,
} from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ViewAssignedTrips = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [vehicles, setVehicles] = useState([]);

  const navigation = useNavigation();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, vehicles.length);

  React.useEffect(() => {
    setPage(0);
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://fleetmgmt.vercel.app/api/assignTrip"
        );
        const { assignTrip } = response.data;
        setVehicles(assignTrip);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    // alert(id);
    try {
      const response = await axios.delete(
        `https://fleetmgmt.vercel.app/api/driver/${id}`
      );
      const { message } = response.data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <Header title={"View Assigned Trips"} />
        <View>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Trip From</DataTable.Title>
                <DataTable.Title numeric>Trip To</DataTable.Title>
                <DataTable.Title numeric>Trip Start Date</DataTable.Title>
                <DataTable.Title numeric>Trip End Date</DataTable.Title>
                <DataTable.Title numeric>Assigned Driver</DataTable.Title>
              </DataTable.Header>

              {vehicles.length ? (
                vehicles.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.trip.startLocation}</DataTable.Cell>
                    <DataTable.Cell>{item.trip.endLocation}</DataTable.Cell>
                    <DataTable.Cell>
                      {item.trip.startDate.split("T")[0]}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {item.trip.endDate.split("T")[0]}
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                      {item.driver.fullname}
                    </DataTable.Cell>

                    {/* <DataTable.Cell numeric>
                      <Button
                        icon={"delete"}
                        onPress={() => handleDelete(item.id)}
                      ></Button>
                    </DataTable.Cell> */}
                  </DataTable.Row>
                ))
              ) : (
                <Text style={{ margin: 10 }}>No drivers added yet!</Text>
              )}

              {/* {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
              <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
            </DataTable.Row>
          ))} */}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(vehicles.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${vehicles.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={"Rows per page"}
              />
            </DataTable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ViewAssignedTrips;
