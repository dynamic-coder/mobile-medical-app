import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  View,
} from 'react-native';

import {Card, Badge, Button, Block, Text} from '../components';
import {theme, mocks} from '../constants';
import {I18nContext} from '../translations/i18n';

const {width} = Dimensions.get('window');

const Browse = ({navigation}) => {
  const {translate, isRTL} = useContext(I18nContext);

  const [active, setActive] = useState('Products');
  const [slide, setSlide] = useState([]);

  const services = [
    {
      id: '1',
      name: translate('categ1'),
      value: 'Docteurs',
      tags: ['Docteur'],
      count: 147,
      image: require('../../assets/icons/Doctor.png'),
    },
    {
      id: '2',
      name: translate('categ2'),
      value: 'Infirmières',
      tags: ['Infirmières'],
      count: 16,
      image: require('../../assets/icons/Nurse.png'),
    },
    {
      id: '3',
      name: translate('categ3'),
      value: 'Pharmacies',
      tags: ['Pharmacies'],
      count: 68,
      image: require('../../assets/icons/Pharmacie.png'),
    },
    {
      id: '4',
      name: translate('categ4'),
      value: 'Hopitaux',
      tags: ['Hopitaux'],
      count: 17,
      image: require('../../assets/icons/Hospital.png'),
    },
    {
      id: '5',
      name: translate('categ5'),
      value: 'Ambulance',
      tags: ['Ambulance'],
      count: 47,
      image: require('../../assets/icons/Ambulance.png'),
    },
    {
      id: '6',
      name: translate('categ6'),
      value: 'Laboratoires',
      tags: ['Laboratoire'],
      count: 47,
      image: require('../../assets/icons/Labo.png'),
    },
  ];

  useEffect(() => {
    setSlide(services);
  }, []);

  const handleTab = tab => {
    const filtered = slide.filter(slide =>
      slide.tags.includes(tab.toLowerCase()),
    );

    setActive(tab);
    setSlide(filtered);
  };

  const handleService = value => {
    navigation.navigate('Chercher', {value});
  };

  const renderTab = tab => {
    // const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  // const tabs = ["Products", "Inspirations", "Shop"];

  return (
    <Block>
      <View
        // flex={false}
        // row
        // center
        // space='between'
        style={{
          paddingHorizontal: theme.sizes.base * 2,
          paddingTop: 5,
          // direction: isRTL ? 'rtl' : 'ltr',
          // flexDirection: isRTL ? 'row-reverse' : 'row',
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text h1 bold>
          Services
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: theme.sizes.base * 2}}>
        <View style={styles.categories}>
          {slide.map(slide => (
            <TouchableOpacity
              key={slide.name}
              // onPress={() => navigation.navigate('ServiceDocteur',{category})}
              onPress={() => handleService(slide.value)}>
              <Card center middle shadow style={styles.categ}>
                <Badge
                  margin={[0, 0, 15]}
                  size={50}
                  color="rgba(41,216,143,0.20)">
                  <Image source={slide.image} style={styles.servImg} />
                </Badge>
                <Text medium height={20} style={styles.servTitle}>
                  {slide.name}
                </Text>
                {/* <Text gray caption>
                    {category.count} products
                  </Text> */}
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Block>
  );
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: 5,
  },
  avatar: {
    height: theme.sizes.base * 5,
    width: theme.sizes.base * 10,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    // marginBottom: theme.sizes.base * 1,
    paddingTop: 0,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categ: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  servImg: {
    height: theme.sizes.base * 4.7,
    width: theme.sizes.base * 4.7,
    marginTop: 15,
  },
  servTitle: {
    marginTop: 15,
  },
});
