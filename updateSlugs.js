const Tour = require('./models/tourModel');

// Function to update slugs for all tours
const updateSlugs = async () => {
  try {
    const tours = await Tour.find(); // Get all tours
    for (let tour of tours) {
      // Create a slug from the tour's name
      const slug = tour.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]/g, '');
      tour.slug = slug; // Update the slug field
      await tour.save(); // Save the tour document
    }
    console.log('All slugs have been updated!');
  } catch (err) {
    console.error('Error updating slugs:', err);
  }
};

// Export the function
module.exports = { updateSlugs };
