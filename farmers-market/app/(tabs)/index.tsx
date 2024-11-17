import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState(""); // State for input value

  const clearSearch = () => setSearchText(""); // Function to clear the input
  const categories = [
    { id: "1", name: "You Bought", icon: "refresh", color: "#FFA500" },
    { id: "2", name: "Discounts & Offers", icon: "percent", color: "#FF4500" },
    {
      id: "3",
      name: "Milk & Eggs",
      icon: "bottle-tonic-outline",
      color: "#4CAF50",
    },
    { id: "4", name: "Pasta & Grains", icon: "food", color: "#008080" },
    { id: "5", name: "Coffee & Tea", icon: "coffee-outline", color: "#8B4513" },
    {
      id: "6",
      name: "Vegetables & Greens",
      icon: "food-apple",
      color: "#228B22",
    },
    {
      id: "7",
      name: "Fruits & Berries",
      icon: "fruit-grapes-outline",
      color: "#8A2BE2",
    },
    { id: "8", name: "All Categories", icon: "apps", color: "#4682B4" },
  ];

  const productSections = [
    {
      id: "1",
      title: "Discounts & Offers",
      products: [
        {
          id: "1",
          name: "Milk Chocolate 85g",
          price: "$4.99",
          discount: "-52%",
        },
        { id: "2", name: "Coca-Cola 2L", price: "$7.55", discount: "-10%" },
        { id: "3", name: "Mineral Water 1L", price: "$6.05", discount: "-9%" },
      ],
    },
    {
      id: "2",
      title: "Milk & Eggs",
      products: [
        { id: "1", name: "Whole Milk 1L", price: "$2.50" },
        { id: "2", name: "Farm Fresh Eggs (12pcs)", price: "$4.00" },
        { id: "3", name: "Cheese Block 500g", price: "$5.75" },
      ],
    },
    {
      id: "3",
      title: "Fruits & Berries",
      products: [
        { id: "1", name: "Banana 1kg", price: "$2.50" },
        { id: "2", name: "Apple 1kg", price: "$3.00" },
        { id: "3", name: "Strawberry 500g", price: "$4.50" },
        { id: "4", name: "Blueberry 500g", price: "$5.00" },
      ],
    },
  ];
  type Category = {
    id: string;
    name: string;
    icon: string;
    color: string;
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
      <Text style={styles.categoryLabel}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{
          uri: "https://via.placeholder.com/150",
        }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {item.discount && (
        <Text style={styles.productDiscount}>{item.discount}</Text>
      )}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
  type Product = {
    id: string;
    name: string;
    price: string;
    discount?: string; // Optional property
  };

  type ProductSection = {
    id: string;
    title: string;
    products: Product[];
  };
  const renderProductSection = (section: ProductSection) => (
    <View style={styles.productSection} key={section.id}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={section.products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{
                uri: "https://via.placeholder.com/150",
              }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            {item.discount && (
              <Text style={styles.productDiscount}>{item.discount}</Text>
            )}
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FARMERS MARKET</Text>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.headerIcon}
        />
      </View>

      {/* Static Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Quick search"
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={24} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* FlatList for Main Content */}
      <FlatList
        data={productSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderProductSection(item)}
        ListHeaderComponent={() => (
          <FlatList
            data={categories}
            numColumns={4}
            keyExtractor={(item) => item.id}
            renderItem={renderCategory}
            style={styles.categoriesContainer}
          />
        )}
        nestedScrollEnabled={true} // Allow nested scrolling for main content
        contentContainerStyle={styles.mainContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    paddingBottom: 100, // Ensures last section is visible
    paddingHorizontal: 10, // Aligns content consistently
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#4CAF50",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    top: 20,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  headerIcon: {
    position: "absolute",
    left: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  categoriesContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  categoryCard: {
    backgroundColor: "#444",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    width: "22%",
  },
  categoryLabel: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  productSection: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  viewAllText: {
    color: "#FF6E6E",
    fontSize: 14,
    fontWeight: "600",
  },
  productCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    width: 130,
    height: 230,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  productPrice: {
    color: "#FF6E6E",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  productDiscount: {
    fontSize: 12,
    color: "#FFA500",
    marginTop: 2,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 5, // Adjusted for a larger button
    position: "absolute",
    bottom: 0, // Adds padding from the top edge
    left: 0, // Adds padding from the left edge
    right: 0, // Ensures button spans the full width of the card
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
