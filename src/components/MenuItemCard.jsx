export default function MenuItemCard({ item }) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          <img
            className="w-28 h-28 rounded-full object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {item.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {item.category}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          ₹{item.price}
        </div>
      </div>
    </li>
  );
}
