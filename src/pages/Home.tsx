import amp from "../img/amplitude.svg";
import hp from "../img/headphones.svg";
import cassette from "../img/audio-cassette.svg";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex-col">
        <div className="text-center">
          <h1 className="py-8 text-3xl font-bold underline font-titlefont dark:text-white">
            HPDB: A database for headphones
          </h1>
        </div>
        <div className="flex flex-row">
          <img className="w-1/3 p-4" src={amp} alt="" />
          <img className="w-1/3 p-4" src={hp} alt="" />
          <img className="w-1/3 p-4" src={cassette} alt="" />
        </div>
        <div className="p-8 font-notnormal">
          <h2 className="mb-4 text-xl underline">
            HPDB is a website to list headphones for sale!
          </h2>
          <h3 className="text-lg">Features:</h3>
          <ul className="pl-4">
            <li>Create user accounts</li>
            <li>Add products into the database</li>
            <li>List headphones for sale</li>
          </ul>
          <h3 className="mt-8 text-lg">Working on:</h3>
          <ul className="pl-4">
            <li>User reviews</li>
            <li>Filter options for listings and products</li>
            <li>Method for users to track their products</li>
            <li>Adding records to product list</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
