import { useState } from "react";
import upload_photo from "../../Assets/upload_area.svg";

interface AddedItem {
  name: string;
  price: string;
  description: string;
  type: string;
}

const AddItems: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const [addedItem, setAddedItem] = useState<AddedItem>({
    name: "",
    price: "",
    description: "",
    type: "Coffee",
  });
  const wordLimit = 40;
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "description") {
      const words = value.split(/\s+/).filter(Boolean);
      if (words.length > wordLimit) return;
    }

    setAddedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const wordCount = addedItem.description.trim().split(/\s+/).filter(Boolean).length;
  const wordsRemaining = wordLimit - wordCount;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  return (
    <div className="w-[70%] mx-auto my-12 text-gray-700 font-sans text-base bg-gray-100 p-5 rounded-lg shadow-md fade-in-cart">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2.5">
          <p className="text-base font-medium mb-1.5 text-[#333]">Upload Image</p>
          <label htmlFor="image">
            <img className = "w-30 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" src={image?URL.createObjectURL(image):upload_photo} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files?.[0] || null)} type="file" id="image" hidden required />
        </div>
        <div className="flex flex-col gap-2.5 w-full max-w-lg">
          <p className="text-base font-medium mb-1.5 text-[#333]">Item name</p>
          <input className = "p-3 border border-gray-300 rounded-md bg-white text-base transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none" onChange={onChange} value = {addedItem.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="flex flex-col gap-2.5 w-full max-w-lg">
        <p className="text-base font-medium mb-1.5 text-[#333]">Item Description</p>
          <textarea
            name="description"
            className="p-3 border border-gray-300 rounded-md bg-white text-base transition duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            rows={6}
            placeholder="Description of Item"
            value={addedItem.description}
            onChange={onChange}
            required
          ></textarea>
          <p className={`text-sm mt-1 text-gray-500 ${wordsRemaining < 10 ? "text-red-500" : ""}`}>
            {wordsRemaining} word{wordsRemaining !== 1 ? "s" : ""} remaining
          </p>
        </div>
        <div className="flex gap-8">
          <div className="add-category flex-col w-1/2">
            <p>Item Type</p>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              onChange={onChange}
              value={addedItem.type}
              name="type"
              required
            >
              <option value="Coffee">Coffee</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          <div className="add-price flex-col w-1/2">
            <p className="text-base font-medium mb-1.5 text-[#333]">Item price</p>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              onChange={onChange}
              value={addedItem.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        <button type="submit" className="max-w-[200px] px-5 py-3 border-0 rounded-lg bg-blue-500 text-white text-base font-bold cursor-pointer text-center transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 active:bg-blue-700" disabled={wordCount === 0}>ADD</button>
      </form>
    </div>
  )
}

export default AddItems