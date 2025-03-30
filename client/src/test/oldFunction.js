const searchingSong = async () => {
    // Empty the result list before every search
    SetSearchResult([]);

    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:8000/api/songs/getSongs");
      // console.log(res.data);

      const sg = res.data.filter((s) =>
        s.songName.toLowerCase().includes(query)
      );
      const ar = res.data.filter((s) => s.artist.toLowerCase().includes(query));
      const wr = res.data.filter((s) => s.writer.toLowerCase().includes(query));

      // Combine the results, removing duplicates
      const combinedResults = [...new Set([...sg, ...ar, ...wr])];
      SetSearchResult(combinedResults);

      // Storing Current searched song into context
      localStorage.setItem("lastSongList", JSON.stringify(combinedResults));
      setCurrSongList(combinedResults);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }

    // const sg = song.songs.filter((s) =>
    //   s.songName.toLowerCase().includes(query)
    // );
    // const ar = song.songs.filter((s) => s.artist.toLowerCase().includes(query));

    // const wr = song.songs.filter((s) => s.writer.toLowerCase().includes(query));

    // // Combine the results, removing duplicates
    // const combinedResults = [...new Set([...sg, ...ar, ...wr])];

    // // Update the search result
    // SetSearchResult(combinedResults);

    // // Storing Current searched song into context
    // localStorage.setItem("lastSongList", JSON.stringify(combinedResults));
    // setCurrSongList(combinedResults);
  };