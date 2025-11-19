import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type RatingStarsProps = Readonly<{
  rating: number;
  maxRating?: number;
}>;

export function RatingStars({ rating, maxRating = 5 }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      <View style={styles.stars}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Text key={`full-star-${i}`} style={styles.star}>
            ★
          </Text>
        ))}
        {hasHalfStar && <Text key="half-star" style={styles.star}>☆</Text>}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Text key={`empty-star-${i}`} style={styles.starEmpty}>
            ★
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 18,
    color: '#fbbf24',
  },
  starEmpty: {
    fontSize: 18,
    color: '#d1d5db',
  },
});

