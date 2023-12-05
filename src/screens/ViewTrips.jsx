import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Header from "../components/Header";
import {
  Provider as PaperProvider,
  Button,
  DataTable,
} from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ViewTrips = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [vehicles, setVehicles] = useState([]);
  const navigation = useNavigation();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, vehicles.length);

  useEffect(() => {
    setPage(0);
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://fleetmgmt.vercel.app/api/trip"
        );
        const { trip } = response.data;
        setVehicles(trip);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://fleetmgmt.vercel.app/api/trip/${id}`
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
        <Header title={"View Trips"} />
        <View>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Start Date</DataTable.Title>
                <DataTable.Title>End Date</DataTable.Title>
                <DataTable.Title numeric>Start Location</DataTable.Title>
                <DataTable.Title numeric>End Location</DataTable.Title>
                <DataTable.Title numeric>Actions</DataTable.Title>
              </DataTable.Header>

              {vehicles.length ? (
                vehicles.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.startDate}</DataTable.Cell>
                    <DataTable.Cell>{item.endDate}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.startLocation}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{item.endLocation}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      <Button
                        icon="delete"
                        onPress={() => handleDelete(item.id)}
                      ></Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <Text style={{ margin: 10 }}>No vehicles added yet!</Text>
              )}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(vehicles.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${vehicles.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={(value) => setItemsPerPage(value)}
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

export default ViewTrips;
