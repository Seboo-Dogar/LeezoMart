import { categories } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const Category = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <div className="w-full aspect-square flex flex-col items-center justify-center p-4">
              <img
                src={category.image}
                alt={category.text}
                className="w-20 h-20 object-contain mb-2 transition-transform group-hover:scale-110"
              />
              <p className="text-sm font-medium text-center">{category.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
