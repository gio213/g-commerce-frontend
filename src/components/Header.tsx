import { useAppContext } from "@/context/AppContext";
import MainMenu from "./MainMenu";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { Input } from "./ui/input";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import { useEffect, useState } from "react";
import { ProductType } from "@/types";
import Loading from "./Loading"; // Assuming you have a Loading component

const Header = () => {
  const { user, isLoggedin } = useAppContext();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading } = useQuery(
    ["searchParams", searchText],
    () => apiClient.searchProducts(searchText),
    {
      enabled: true,
      onSuccess(data) {
        setSearchResults(data);
        setIsModalOpen(true);
      },
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  }, [searchText, isModalOpen]);

  return (
    <header className="shadow-2xl ">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logoImg}
              alt="logo"
              width={100}
              height={100}
              className="mr-4"
            />
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center space-x-4">
          <Input
            onChange={handleSearch}
            placeholder="Search"
            className="px-4 py-2 rounded-lg input input-bordered"
          />
          {isLoggedin && user?.role === "admin" && (
            <Button
              className="hidden font-bold md:block"
              variant={"ghost"}
              onClick={() => {
                navigate("/admin-dashboard");
              }}
            >
              Admin Dashboard
            </Button>
          )}
          <MainMenu />
          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-4 overflow-y-auto bg-white rounded-lg shadow-lg h-96">
            <span className="flex items-center justify-between">
              <p className="mb-4 text-xl font-bold ">Search Results</p>
              <Button variant={"ghost"} onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </span>
            {isLoading ? (
              <Loading /> // Display the loading component
            ) : (
              <ol>
                {searchResults.map((result, index) => (
                  <li
                    key={result._id}
                    className="flex items-center gap-2 p-2 mb-2 rounded-md hover:cursor-pointer hover:bg-slate-100"
                  >
                    <span className="font-bold">{index + 1}.</span>{" "}
                    {/* Display order number */}
                    <Link
                      to={`/product/detail/${result._id}`}
                      className="flex items-center gap-2"
                      onClick={() => {
                        setSearchText("");
                        setIsModalOpen(false);
                      }}
                    >
                      <img
                        src={result.imagesUrls[0]}
                        alt="searched img"
                        width={50}
                        height={24}
                      />
                      <p className="hover:underline hover:text-blue-500">
                        {result.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
