import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [skills, setSkills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skillDescription, setSkillDescription] = useState('');

  const addSkill = () => {
    setSkills([...skills, { name: newSkill, description: skillDescription, id: Math.random().toString() }]);
    setModalVisible(false);
    setNewSkill('');
    setSkillDescription('');
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={skills}
        renderItem={({ item }) => (
          <View style={styles.skillContainer}>
            <Text style={styles.skillName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => deleteSkill(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Adicionar Skill" onPress={() => setModalVisible(true)} />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Skill"
            value={newSkill}
            onChangeText={setNewSkill}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={skillDescription}
            onChangeText={setSkillDescription}
          />
          <View style={styles.modalButtons}>
            <Button title="Salvar" onPress={addSkill} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button title="Logout" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  skillContainer: { padding: 10, borderBottomWidth: 1 },
  skillName: { fontSize: 18, fontWeight: 'bold' },
  deleteButton: { marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 5 },
  deleteButtonText: { color: 'white', textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  input: { height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 20, width: '80%' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' }
});
