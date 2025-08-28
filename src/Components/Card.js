// Card.js
export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

function Card({ title, value, icon, children }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-gray-300">{icon}</div>
      </div>
      {children && <CardContent>{children}</CardContent>}
    </div>
  );
}

export default Card;




