interface RatingProps {
  rating: number
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <>
        <span className="text-warning"> {Array.from({length: Math.floor(rating)}).map(() => `★`)} 
        </span>{Array.from({length: 5 - Math.floor(rating)}).map(() => `★`)}
    </>                
  );
};

export default Rating;