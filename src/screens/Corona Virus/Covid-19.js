import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
const Covid = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6991c7', '#a3bded']}
          style={styles.card}>
          <Text style={styles.title}>Qu’est ce que Covid-19</Text>
          <Text style={styles.description}>
            COVID-19 est la maladie infectieuse causée par le dernier
            coronavirus qui a été découvert. Ce nouveau virus et cette maladie
            étaient inconnus avant l’apparition de la flambée à Wuhan (Chine) en
            décembre 2019.
          </Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6991c7', '#a3bded']}
          style={styles.card}>
          <Text style={styles.title}>Qu’est ce qu’un Corona Virus</Text>
          <Text style={styles.description}>
            Les coronavirus forment une vaste famille de virus qui peuvent être
            pathogènes chez l’homme et chez l’animal. On sait que, chez l’être
            humain, plusieurs coronavirus peuvent entraîner des infections
            respiratoires dont les manifestations vont du simple rhume à des
            maladies plus graves comme le syndrome respiratoire du Moyen-Orient
            (MERS) et le syndrome respiratoire aigu sévère (SRAS). Le dernier
            coronavirus qui a été découvert est responsable de la maladie à
            coronavirus 2019 (COVID-19)
          </Text>
          <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder_01-Virus_5929243-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f093fb', '#f5576c']}
          style={styles.card}>
          <Text style={styles.title}>
            Quels sont les symptômes de la COVID-19 ?
          </Text>
          <Text style={styles.title}>1. La fièvre</Text>
          <Text style={styles.description}>
            Les symptômes les plus courants de la COVID-19 sont la fièvre, la
            fatigue et une toux sèche. Certains patients présentent des
            douleurs, une congestion nasale, un écoulement nasal, des maux de
            gorge ou une diarrhée. Ces symptômes sont généralement bénins et
            apparaissent de manière progressive.
          </Text>
          <Text style={styles.title}>2. la dyspnée</Text>
          <Text style={styles.description}>
            Environ une personne sur six contractant la maladie présente des
            symptômes plus graves, notamment une dyspnée. Les personnes âgées et
            celles qui ont d’autres problèmes de santé (hypertension artérielle,
            problèmes cardiaques ou diabète) ont plus de risques de présenter
            des symptômes graves.
          </Text>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => this._onPressFab(4)}
            activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder_10-Shortness_of_breath_5929235-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6991c7', '#a3bded']}
          style={styles.card}>
          <Text style={styles.title}>
            Comment la COVID-19 se propage-t-elle ?
          </Text>
          <Text style={styles.description}>
            La COVID-19 est transmise par des personnes porteuses du virus. La
            maladie peut se transmettre d’une personne à l’autre par le biais de
            gouttelettes respiratoires expulsées par le nez ou par la bouche
            lorsqu’une personne tousse ou éternue. Ces gouttelettes peuvent se
            retrouver sur des objets ou des surfaces autour de la personne en
            question. On peut alors contracter la COVID-19 si on touche ces
            objets ou ces surfaces et si on se touche ensuite les yeux, le nez
            ou la bouche. Il est également possible de contracter la COVID-19 en
            inhalant des gouttelettes d’une personne malade qui vient de tousser
            ou d’éternuer. C’est pourquoi il est important de se tenir à plus
            d’un mètre d’une personne malade.
          </Text>
          <Text style={styles.description}>
            L’OMS examine les travaux de recherche en cours sur la manière dont
            la COVID-19 se propage et elle continuera à communiquer les
            résultats actualisés.
          </Text>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => this._onPressFab(4)}
            activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder__patient_infection_virus_spread_infect_5928538-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f093fb', '#f5576c']}
          style={styles.card}
          style={styles.card}>
          <Text style={styles.title}>
            Le virus responsable de la COVID-19 est-il transmissible par voie
            aérienne ?
          </Text>
          <Text style={styles.description}>
            Les études menées à ce jour semblent indiquer que le virus
            responsable de la COVID-19 est principalement transmissible par
            contact avec des gouttelettes respiratoires, plutôt que par voie
            aérienne.
          </Text>
          <Text style={styles.description}>
            Voir la réponse à la question précédente, « Comment le COVID-19 se
            propage-t-elle ? »
          </Text>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => this._onPressFab(4)}
            activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder_22-Cough_5929222-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6991c7', '#a3bded']}
          style={styles.card}>
          <Text style={styles.title}>
            Peut-on contracter la COVID-19 au contact d’une personne qui ne
            présente aucun symptôme ?
          </Text>
          <Text style={styles.description}>
            La maladie se propage principalement par les gouttelettes
            respiratoires expulsées par les personnes qui toussent. Le risque de
            contracter la COVID-19 au contact d’une personne qui ne présente
            aucun symptôme est très faible. Cependant, beaucoup de personnes
            atteintes ne présentent que des symptômes discrets. C’est
            particulièrement vrai aux premiers stades de la maladie.
          </Text>
          <Text style={styles.description}>
            Il est donc possible de contracter la COVID-19 au contact d’une
            personne qui n’a, par exemple, qu’une toux légère mais qui ne se
            sent pas malade.
          </Text>
          <Text style={styles.description}>
            L’OMS examine les travaux de recherche en cours sur le délai de
            transmission de la COVID-19 et elle continuera à communiquer des
            résultats actualisés.
          </Text>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => this._onPressFab(4)}
            activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder__runny_nose_nose_symptom_disease_virus_5928540-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f093fb', '#f5576c']}
          style={styles.card}
          style={styles.card}>
          <Text style={styles.title}>
            Combien de temps dure la période d’incubation de la COVID-19 ?
          </Text>
          <Text style={styles.description}>
            La période d’incubation est le temps qui s’écoule entre l’infection
            et l’apparition des symptômes de la maladie. On estime actuellement
            que la période d’incubation de la COIVD-19 dure de 1 à 14 jours et
            le plus souvent autour de cinq jours.
          </Text>

          <TouchableOpacity
            style={styles.fab}
            onPress={() => this._onPressFab(4)}
            activeOpacity={0.8}>
            <Image
              source={{
                uri:
                  'https://covid-19.tn/wp-content/uploads/2020/03/iconfinder_28-Calendar_5929216-150x150.png',
              }}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.textVersion}>source : covid-19.tn</Text>
      </ScrollView>
    </View>
  );
};
export default Covid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  fab: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    elevation: 8,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  githubIcon: {
    alignSelf: 'center',
    height: 40,
    width: 40,
  },
  bottomTitle: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 8,
  },
  textVersion: {
    color: '#A9A9A9',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 8,
    fontSize: 10,
  },
});
