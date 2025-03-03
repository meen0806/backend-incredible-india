export const addLocationservice = async (data, file, protocol, getHost) => {
    try {
        let picturePath = "";
    
        if (file) {
          const fullUrl = `${protocol}://${getHost("host")}`;
          picturePath = `${fullUrl}/uploads/${file.filename}`;
        }
    
        const normalizedParentId = data.parent_id === "null" || data.parent_id === "" ? null : data.parent_id;
    
        const newLocation = new Location({
          name: data.name,
          description: data.description,
          favorite: data.favorite,
          most_visited: data.most_visited,
          parent_id: normalizedParentId,
          picture: picturePath,
        });
    
        const savedLocation = await newLocation.save();
    
        return savedLocation;
      } catch (error) {
        throw new Error(error.message);
      }
  };
  