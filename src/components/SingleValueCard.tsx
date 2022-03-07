import SingleValueProps from "./SingleValueProps";

function SingleValueCard({ title, value }: SingleValueProps) {
  return (
    <div className="card-2">
      <p className="card-header">{title}</p>
      <p className="card-value">{value}</p>
    </div>
  );
}

export default SingleValueCard;
