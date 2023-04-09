/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/restaurant/Footer";
import Navbar from "@/components/restaurant/Navbar";
import service from "@/services";
import { BASE_URL } from "@/services/api";
import { Restaurant } from "@/services/search";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData("กรุงเทพ");
  }, []);

  const fetchData = (query: string) => {
    if (query.trim() != "") {
      service.search.restaurant({ query: query.trim() }).then((res) => {
        setRestaurants(res.data);
      });
    }
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };

  const handlePressSearch = () => {
    fetchData(search);
  };

  const renderDetail = () => {
    if (restaurants.length == 0) {
      return null;
    }
    return (
      <div className="restaurant-list">
        {restaurants.map((e, i) => (
          <div key={e.place_id} className="item">
            <div className="image">
              {restaurants[i].photos ? (
                <img
                  src={`${BASE_URL}/search/restaurant/photo?photo_reference=${restaurants[i].photos?.[0].photo_reference}`}
                  alt={restaurants[i].name}
                />
              ) : (
                <p>ไม่พบรูป</p>
              )}
            </div>
            <div className="detail">
              <h2 className="title">{restaurants[i].name}</h2>
              <p>คะแนน: {restaurants[i].rating}</p>
              <p>{restaurants[i].formatted_address}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="restaurant">
      <Navbar
        onSearch={onChangeSearch}
        onKeyDown={handleKeyDown}
        onPressSearch={handlePressSearch}
      />
      <div className="body">{renderDetail()}</div>
      <Footer />
    </div>
  );
}
