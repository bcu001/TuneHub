import { v4 as uuidv4 } from "uuid";
import Card from "../../components/cards/Card";
import Carousel from "../../components/carousel/Carousel";

const Ranking = () => {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://imgs.search.brave.com/2wgfiuMJRuQF0wud6vDoW7bTPInTJqMpL_Cro_10ONk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTFkV2U1c3FlSEwu/anBn" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg" />
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center mr-3">
      <Carousel
        cards={cards}
        height="400px"
        width="50%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />
    </div>
  );
};

export default Ranking;
